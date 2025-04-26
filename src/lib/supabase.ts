import { createClient, RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { Database } from '../../database.types'
import { Note } from "@/modules/notes/note.entity";

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_API_KEY
)

/**
 * 指定されたユーザーIDに紐づくノートの Realtime_changes を購読し、 callback を実行します。
 *
 * -  callback には、変更されたノートの RealtimePostgresChangesPayload を渡します。
 * - 購読を停止するには、返される RealtimeChannel を unsubscribe へ渡します。
 *
 * @param userId
 * @param callback
 * @returns
 */
export const subscribe = (
    userId: string,
    callback: (payload: RealtimePostgresChangesPayload<Note>) => void
) => {
    return supabase
        .channel("notes-changes")
        .on<Note>(
            "postgres_changes",
            {
                event: '*',
                schema: 'public',
                table: 'notes',
                filter: `user_id=eq.${userId}`
            },
            callback
        )
        .subscribe()
}

/**
 * 指定された RealtimeChannel を購読解除します。
 *
 * @param channel 購読解除する RealtimeChannel
 */
export const unsubscribe = (channel: RealtimeChannel) => {
    supabase.removeChannel(channel)
}