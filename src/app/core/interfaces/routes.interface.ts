export type RouteItem = {
  name?: string;
  id: string;
  path: string;
  component: ({}: any) => any;
  guard?: any;
  role?: any;
  index?: boolean;
  userTypes?: UserTypes[];
  roles?: UserRoles[];
  permissions?: PermissionType[];
  icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  iconActive?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  hidden?: boolean;
  current?: boolean;
  isSecondaryItem?: boolean;
  props?: any;
};

export type ResolvePath = {
  resolve: (...props: any) => any;
};

export enum UserTypes {
  admin = "admin",
  user = "user",
}

export enum UserRoles {
  admin = "Administrator",
  user = "User",
  staff = "Staff",
}

export enum PermissionType {
  ORGANIZATION_UPDATE = "organization.update",

  GROUP_ASSESSMENT_VIEW = "group-assessment.view",
  GROUP_ASSESSMENT_CREATE = "group-assessment.create",
  GROUP_ASSESSMENT_UPDATE = "group-assessment.update",
  GROUP_ASSESSMENT_DELETE = "group-assessment.delete",

  INVITATION_CREATE = "user.invitation.create",
  INVITATION_DELETE = "user.invitation.delete",

  USER_VIEW = "user.view",
  USER_UPDATE = "user.update",
  USER_DELETE = "user.delete",

  GYM_VIEW = "gym.view",
  GYM_CREATE = "gym.create",
  GYM_UPDATE = "gym.update",
  GYM_DELETE = "gym.delete",

  FORM_VIEW = "form.view",
  FORM_CREATE = "form.create",
  FORM_UPDATE = "form.update",
  FORM_DELETE = "form.delete",

  GROUP_VIEW = "group.view",
  GROUP_CREATE = "group.create",
  GROUP_UPDATE = "group.update",
  GROUP_DELETE = "group.delete",

  MEMBER_VIEW = "member.view",
  MEMBER_CREATE = "member.create",
  MEMBER_UPDATE = "member.update",
  MEMBER_DELETE = "member.delete",

  GYM_SALES_AGREEMENT_VIEW = "gym.sales.agreement.view",
  GYM_SALES_AGREEMENT_CREATE = "gym.sales.agreement.create",
  GYM_SALES_AGREEMENT_UPDATE = "gym.sales.agreement.update",
  GYM_SALES_AGREEMENT_DELETE = "gym.sales.agreement.delete",

  ORGANIZATION_SALES_AGREEMENT_VIEW = "organizations.sales-agreement.view",
  ORGANIZATION_SALES_AGREEMENT_CREATE = "organizations.sales-agreement.create",
  ORGANIZATION_SALES_AGREEMENT_UPDATE = "organizations.sales-agreement.update",
  ORGANIZATION_SALES_AGREEMENT_DELETE = "organizations.sales-agreement.delete",
  ORGANIZATION_SALES_AGREEMENT_IMPORT = "organizations.sales-agreement.import",

  PRESENTATION_DECK_VIEW = "presentation-deck.view",
  PRESENTATION_DECK_CREATE = "presentation-deck.create",
  PRESENTATION_DECK_UPDATE = "presentation-deck.update",
  PRESENTATION_DECK_UPDATE_STATUS = "presentation-deck.update-active",
  PRESENTATION_DECK_DELETE = "presentation-deck.delete",

  PRESENTATION_DECK_SLIDE_CREATE = "presentation-deck.create-slides",

  BOARD_VIEW = "digital-board.view",
  BOARD_CREATE = "digital-board.create",
  BOARD_UPDATE = "digital-board.update",
  BOARD_DELETE = "digital-board.delete",

  SESSION_VIEW = "session.view",
  SESSION_CREATE = "session.create",
  SESSION_UPDATE = "session.update",
  SESSION_DELETE = "session.delete",
}
