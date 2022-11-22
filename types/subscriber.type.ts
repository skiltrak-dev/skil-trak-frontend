export enum UnsubscribedBy {
   Admin = 'admin',
   User = 'user',
}

export type Subscriber = {
   id: number
   email: string
   isSubscribed: boolean
   unsubscribedBy: string
}
