import { supabase } from "@/lib/supabase"

export const noteRepository = {
    /**
     * ノートを作成する
     * @param userId ユーザーID
     * @param params 作成するノートのパラメータ
     *   - title: ノートのタイトル (任意)
     *   - parentId: 親ドキュメントのID (任意)
     * @returns 作成されたノートのデータ
     * @throws {Error} 作成に失敗した場合
     */
    async create(
        userId: string,
        params: { title?: string, parentId?: number }
    ) {
        const { data, error } = await supabase.from('notes').insert([
            {
                user_id: userId,
                title: params.title,
                parent_document: params.parentId
            }
        ])
            .select()
            .single()
        if (error !== null) throw new Error(error.message)
        return data
    },

    /**
     * 指定されたユーザーIDおよびオプションの親ドキュメントIDに基づいてノートを取得します。
     *
     * - ユーザーIDに一致するノートを全て取得します。
     * - 親ドキュメントIDが指定された場合、そのIDに一致するノートを取得します。
     * - 取得したノートは作成日時の降順にソートされます。
     *
     * @param userId ユーザーID
     * @param parentDocumentId 親ドキュメントのID (任意)
     * @returns 条件に一致するノートの配列
     */

    async find(userId: string, parentDocumentId?: number) {
        const query = supabase
            .from('notes')
            .select()
            .eq("user_id", userId)
            .order('created_at', { ascending: false })
        const { data } = parentDocumentId
            ? await query.eq('parent_document', parentDocumentId)
            : await query.is('parent_document', null)

        return data
    },

    /**
     * 指定されたユーザーIDおよびIDに基づいてノートを取得します。
     *
     * - ユーザーIDに一致するノートを1件取得します。
     * - 取得したノートは該当するIDを持つノートです。
     *
     * @param userId ユーザーID
     * @param id ノートのID
     * @returns 条件に一致するノート
     */
    async findOne(userId: string, id: number) {
        const { data } = await supabase
            .from('notes')
            .select()
            .eq('id', id)
            .eq('user_id', userId)
            .single()

        return data
    },

    /**
     * 指定されたIDのノートを更新します。
     *
     * - そのIDに一致するノートを1件取得します。
     * - 取得したノートに、指定されたパラメータを反映させます。
     * - 更新に失敗した場合は何も返しません。
     * - 更新に成功した場合は、更新されたノートを返します。
     *
     * @param id 更新するノートのID
     * @param note ノートのパラメータ
     *   - title: ノートのタイトル (任意)
     *   - content: ノートの内容 (任意)
     * @returns 更新されたノート
     */
    async update(id: number, note: { title?: string, content?: string }) {
        const { data } = await supabase
            .from('notes')
            .update(note)
            .eq('id', id)
            .select()
            .single()

        return data
    },

    async findByKeyword(userId: string, keyword: string) {
        const { data } = await supabase
            .from('notes')
            .select()
            .eq('user_id', userId)
            .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
            .order("created_at", { ascending: false })

        return data
    },

    async delete(noteId: number) {
        const { error } = await supabase.rpc(`delete_children_notes_recursively`, {
            note_id: noteId
        })
        if (error) throw new Error(error.message)
        return true
    }
}