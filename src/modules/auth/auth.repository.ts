import { supabase } from "@/lib/supabase"

export const authRepository = {
    /**
     * サインアップする
     * @param name ユーザー名
     * @param email メールアドレス
     * @param password パスワード
     * @returns サインアップしたユーザー情報
     * @throws {Error} サインアップに失敗した場合
     */
    async signup(name: string, email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } }
        })

        if (error !== null || data.user === null) throw new Error(error?.message)

        return {
            ...data.user,
            userName: data.user.user_metadata.name
        }
    },
    /**
     * サインインする
     * @param email メールアドレス
     * @param password パスワード
     * @returns サインインしたユーザー情報
     * @throws {Error} サインインに失敗した場合
     */
    async signin(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error !== null || data.user === null) throw new Error(error?.message)

        return {
            ...data.user,
            userName: data.user.user_metadata.name
        }
    },
    /**
     * 現在のユーザー情報を取得する
     * @returns ユーザー情報
     * @throws {Error} 認証情報が取得できなかった場合
     */
    async getCurrentUser() {
        const { data, error } = await supabase.auth.getSession()

        if (error !== null) throw new Error(error?.message)
        if (data.session === null) return

        return {
            ...data.session.user,
            userName: data.session.user.user_metadata.name
        }
    },

    async signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) throw new Error(error.message)
        return true
    }
}