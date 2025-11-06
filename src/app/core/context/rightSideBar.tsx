import { createContext, useReducer } from "react";

export interface IRightSideBarContextProps {
    state: IRightSidebarState;
    dispatch: Function;
}

export const RightSideBarContext = createContext<IRightSideBarContextProps>(
    {} as IRightSideBarContextProps
);

export enum RightSidebarActions {
    SETITEM,
    REMOVEITEM,
    REFRESHTABLE,
}

export interface IRightSidebarState {
    component?: any;
    refresh?: boolean;
}

export interface IRightSidebarPayload {
    action: RightSidebarActions;
    component: any;
}

export const RightSideBarProvider = (props: any) => {
    const [state, dispatch] = useReducer(
        (state: IRightSidebarState, payload: IRightSidebarPayload) => {
            switch (payload.action) {
                case RightSidebarActions.SETITEM:
                    return { component: payload.component };

                case RightSidebarActions.REMOVEITEM:
                    return {
                        component: null,
                    };
                case RightSidebarActions.REFRESHTABLE:
                    return {
                        refresh: true,
                    };
                default:
                    throw new Error("Undefined action provided.");
            }
        },
        {} as IRightSidebarState
    );

    return (
        <RightSideBarContext.Provider value={{ state, dispatch }}>
            {props.children}
        </RightSideBarContext.Provider>
    );
};
