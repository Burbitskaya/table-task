export interface IDataItem {
    id: string;
    name: string;
    date: string;
    value: number;
}

export type FormValues = Omit<IDataItem, 'id'>;