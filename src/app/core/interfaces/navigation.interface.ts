export interface INavigation {
    name: string;
    path: string;
    current: boolean;
    icon: any;
    iconActive?: any;
}

export interface IMainNavigation {
    primary: INavigation[];
    secondary: INavigation[];
}
