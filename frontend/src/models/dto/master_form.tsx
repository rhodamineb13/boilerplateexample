export interface FormSchema {
    title: string;
    fields: FormField[][];
}

export interface FormField {
    name: string;
    label: string;
    type: string;
    capture?: boolean | 'user' | 'environment' | undefined;
    accept?: string;
    options?: string[];
}