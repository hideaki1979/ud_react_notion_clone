import { authRepository } from "@/modules/auth/auth.repository";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";


/**
 * サインイン画面のコンポーネント。
 *
 * - ユーザーがサインイン済みの場合は、ホーム画面にリダイレクトします。
 * - サインインしていない場合は、サインインフォームを表示します。
 *   - フォームにはメールアドレスとパスワードの入力欄があります。
 *   - メールアドレスとパスワードが入力されていれば、サインインボタンを有効化します。
 *   - サインインボタンをクリックすると、サインイン処理を実行します。
 *   - サインインに成功すると、ホーム画面にリダイレクトします。
 *   - サインインに失敗すると、エラーメッセージを表示します。
 * - 画面下部には、登録フォームへのリンクがあります。
 */
function Signin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const currentUserStore = useCurrentUserStore()

  /**
   * サインイン処理を実行します。
   *
   * - メールアドレスとパスワードを使用してサインインを実行します。
   * - サインインに成功すると、ホーム画面にリダイレクトします。
   * - サインインに失敗すると、エラーメッセージを表示します。
   */
  const signin = async () => {
    const user = await authRepository.signin(email, password)
    currentUserStore.set(user)
  }

  if (currentUserStore.currentUser) return <Navigate replace to='/' />

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-4 lg:px-8 sm:px-6">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-700">
          Notionクローン
        </h2>
        <div className="mt-8 w-full max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  メールアドレス
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    required
                    type="email"
                    value={email}
                    className="appearance-none block border w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  パスワード
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="パスワード"
                    required
                    type="password"
                    value={password}
                    className="appearance-none block border w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  disabled={email === '' || password === ''}
                  onClick={signin}
                  className="w-full border flex justify-center py-2 px-4 bg-slate-800 border-transparent text-white text-sm rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ログイン
                </button>
              </div>
              <div className="text-center text-sm">
                登録は
                <Link className="underline" to={'/signup'}>
                  こちら
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
