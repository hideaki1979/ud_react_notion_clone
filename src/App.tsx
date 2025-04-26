import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import { Home } from "./pages/Home"
import NoteDetail from "./pages/NoteDetail"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { useEffect, useState } from "react"
import { useCurrentUserStore } from "./modules/auth/current-user.state"
import { authRepository } from "./modules/auth/auth.repository"

/**
 * アプリケーションのメインコンポーネント。
 * 
 * - 初期化時に現在のユーザーセッションを取得し、ユーザーストアに設定します。
 * - ローディング状態の間は空の<div>を表示します。
 * - ユーザーがサインインしているかどうかに基づいて、ルートをレンダリングします。
 *   - サインイン済みの場合は、ホームページとノート詳細ページを表示します。
 *   - サインインしていない場合は、サインインとサインアップページを表示します。
 */
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const currentUserStore = useCurrentUserStore()

  useEffect(() => {
    const setSession = async () => {
      const currentUser = await authRepository.getCurrentUser()
      currentUserStore.set(currentUser)
      setIsLoading(false)
    }
    setSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <div></div>

  return (
    <BrowserRouter>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
