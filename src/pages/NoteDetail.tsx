import Editor from '@/components/Editor';
import { TitleInput } from '@/components/TitleInput';
import { useCurrentUserStore } from '@/modules/auth/current-user.state';
import { noteRepository } from '@/modules/notes/note.repository';
import { useNoteStore } from '@/modules/notes/note.state';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * ノートの詳細画面を表示するコンポーネント
 *
 * このコンポーネントは、パスパラメータからノートIDを取得し、データベースからノートを取得します。
 * 取得したノートをuseNoteStoreに設定し、TitleInputコンポーネントで表示します。
 * また、TitleInputコンポーネントでタイトルが更新された場合には、useNoteStoreを更新します。
 *
 * @returns ノートの詳細画面を表示するコンポーネント
 */
const NoteDetail = () => {

  const { currentUser } = useCurrentUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const noteStore = useNoteStore()
  const id = params.id ? parseInt(params.id) : null
  const note = id !== null ? noteStore.getOne(id) : null

  useEffect(() => {
    if (id === null) return
    /**
     * ユーザーに紐づくノートをサーバーから取得し、noteStore に設定します。
     *
     * - その間に、ローディング状態を true に設定します。
     * - 取得に失敗した場合は何も行わず、関数を終了します。
     * - 取得に成功した場合は、noteStore に取得したノートを設定します。
     * - 最後に、ローディング状態を false に設定します。
     */
    const fetchOne = async () => {
      setIsLoading(true)
      const note = await noteRepository.findOne(currentUser!.id, id)
      if (!note) return
      setIsLoading(false)
      noteStore.set([note])
    }
    fetchOne()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  /**
   * 指定されたIDのノートを更新します。
   *
   * @param id 更新するノートのID
   * @param note 更新するノートのデータ
   *   - title: ノートのタイトル (任意)
   *   - content: ノートの内容 (任意)
   * @returns 更新されたノートのデータを返します。更新に失敗した場合は何も返しません。
   */
  const updateNote = async (id: number, note: { title?: string, content?: string }) => {
    const updatedNote = await noteRepository.update(id, note)
    if (!updatedNote) return
    noteStore.set([updatedNote])
    return updatedNote
  }

  if (isLoading) return <div />
  if (!note) return <div>note is not existed</div>
  if (!id) return <div>id is invalid</div>
  // console.log(note)

  return (
    <div className="pb-40 pt-20">
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <TitleInput initialData={note} onTitleChange={(title) => updateNote(note.id, { title })} />
        <Editor
          onChange={(content) => updateNote(note.id, { content })}
          initialContent={note.content}
        />
      </div>
    </div>
  );
};

export default NoteDetail;
