import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrentUserStore } from '@/modules/auth/current-user.state';
import { noteRepository } from '@/modules/notes/note.repository';
import { useNoteStore } from '@/modules/notes/note.state';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ホーム画面のコンポーネント。
 *
 * - 新しいノートを作成するためのフォームを表示します。
 * - フォームには、ノートのタイトルの入力欄があります。
 * - ノートのタイトルが入力されていれば、作成ボタンを有効化します。
 * - 作成ボタンをクリックすると、サインアップ処理を実行します。
 * - サインアップに成功すると、ホーム画面にリダイレクトします。
 * - サインアップに失敗すると、エラーメッセージを表示します。
 */
export function Home() {
  const [title, setTitle] = useState('')
  const { currentUser } = useCurrentUserStore()
  const noteStore = useNoteStore()
  const navigate = useNavigate()

  /**
   * 新しいノートを作成する非同期関数。
   *
   * - 現在のユーザー ID を基に、新しいノートを作成します。
   * - 作成に成功した場合は、noteStore に作成されたノートを設定します。
   * - 作成に失敗した場合は、何も行わず、関数を終了します。
   * - 最後に、title 状態をリセットします。
   */
  const createNote = async () => {
    const newNote = await noteRepository.create(currentUser!.id, {
      title
    })
    noteStore.set([newNote])
    setTitle('')
    navigate(`/notes/${newNote.id}`)
  }

  return (
    <Card className="border-0 shadow-none w-1/2 m-auto">
      <CardHeader className="px-4 pb-3">
        <CardTitle className="text-lg font-medium">
          新しいノートを作成してみましょう
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex gap-2">
          <input
            className="h-9 flex-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
            placeholder="ノートのタイトルを入力"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={createNote}
          >
            <Plus className="h-4 w-4" />
            <span className="ml-1">ノート作成</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
