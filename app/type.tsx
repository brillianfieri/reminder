export type User = {
    id:number,
    name:string,
    username:string,
    email:string,
    role:string
}

export type Log={
    user: {
        username: string;
    },
    id: number;
    log_date: Date;
    user_id: number;
    message: string;
}

export type FetchUserData = () => Promise<void>

export type FetchLogData = () => Promise<void>

export type FetchAccountData = () => Promise<void>

export type ReminderData={
    reminder_category: {
        name: string;
    };
    id: number;
    category_id: number;
    is_completed: number;
    reminder_title: string;
    reminder_desc: string;
    reminder_date: Date | null;
    created_at: Date;
    updated_at: Date;
}

export type CategoryDataFetch={
    reminderCategory:ReminderCategory[];
    sharedReminderCategory:SharedReminderCategory[];
}

export type ReminderCategory={
    id: number;
    name: string;
    user_id: number;
}

export type SharedReminderCategory={
    reminder_category: {
        user: {
            username: string;
        };
        id: number;
        name: string;
    };
    user_id: number;
    category_id: number;

}


export type ReminderParams = {
    categoryName: string;
    reminderType: number;
    categoryId: number;
    sharedOwner:string;
}

export type ShareList = {
    user: {
        username: string;
    };
    user_id: number;
    category_id: number;
}

export type SetReminderParams = React.Dispatch<React.SetStateAction<{
    categoryName: string;
    reminderType: number;
    categoryId: number;
    sharedOwner: string;
}>>;

export type FetchReminderData = (refreshReminder: boolean, refreshCategory: boolean, reminderType: number | null, categoryId: number | null) => Promise<void>
