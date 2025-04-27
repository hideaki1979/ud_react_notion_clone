import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import { useCurrentUserStore } from './modules/auth/current-user.state';
import { useNoteStore } from './modules/notes/note.state';
import { useEffect, useState } from 'react';
import { noteRepository } from './modules/notes/note.repository';
import { Note } from './modules/notes/note.entity';
import { subscribe, unsubscribe } from './lib/supabase';


/**
 * サインイン中のユーザー向けのレイアウトコンポーネント
 *
 * - サインインしていない場合は、サインインページにリダイレクトします。
 * - サインイン中の場合は、サイドバーとメインの2つの領域に分割されたレイアウトを描画します。
 *   - サイドバーには、検索ボタンとノートの一覧を表示します。
 *   - メインの領域には、Outlet コンポーネントを配置し、ルートに応じて異なるページを描画します。
 */
const Layout = () => {
  const { currentUser } = useCurrentUserStore()
  const noteStore = useNoteStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const [searchResult, setSearchResult] = useState<Note[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    /**
     * ユーザーに紐づくノートをサーバーから取得し、noteStore に設定します。
     *
     * - その間に、ローディング状態を true に設定します。
     * - 取得に失敗した場合は何も行わず、関数を終了します。
     * - 取得に成功した場合は、noteStore に取得したノートを設定します。
     * - 最後に、ローディング状態を false に設定します。
     */
    const fetchNotes = async () => {
      setIsLoading(true)
      const notes = await noteRepository.find(currentUser!.id)
      if (notes === null) return
      noteStore.set(notes)
      setIsLoading(false)
    }
    const subscribeNote = () => {
      if (!currentUser) return
      return subscribe(currentUser!.id, (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          noteStore.set([payload.new])
        } else if (payload.eventType === 'DELETE') {
          noteStore.delete(payload.old.id!)
        }
      })
    }
    fetchNotes()
    const channel = subscribeNote()
    return () => {
      unsubscribe(channel!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchNotes = async (keyword: string) => {
    const notes = await noteRepository.findByKeyword(currentUser!.id, keyword)
    if (!notes) return
    noteStore.set(notes)
    setSearchResult(notes)
  }

  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`)
    setIsShowModal(false)
  }

  if (!currentUser) return <Navigate replace to='/signin' />
  return (
    <div className="h-full flex">
      {!isLoading && <SideBar onSearchButtonClicked={() => setIsShowModal(true)} />}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={isShowModal}
          notes={searchResult}
          onItemSelect={moveToDetail}
          onKeywordChanged={searchNotes}
          onClose={() => setIsShowModal(false)}
        />
      </main>
    </div>
  );
};

export default Layout;
