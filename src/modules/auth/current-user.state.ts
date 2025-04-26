import { User } from "@supabase/supabase-js";
import { atom, useAtom } from "jotai";

const currentUserAtom = atom<User>()

/**
 * 現在のユーザー情報を取得および設定するためのフックです。
 * 
 * @returns 現在のユーザーオブジェクトと、そのユーザーオブジェクトを更新するための関数を含むオブジェクト。
 */

export const useCurrentUserStore = () => {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

    return { currentUser, set: setCurrentUser }
}
