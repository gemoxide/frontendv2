import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import auth from "./auth";
import adminRoles from "./admin-roles";
import adminUsers from "./admin-users";
import adminOrganizations from "./admin-organizations";
import adminPermissions from "./admin-permissions";
import organizations from "./organizations";
import settings from "./settings";
import gyms from "./gyms";
import salesAgreements from "./sales-agreements";
import groups from "./groups";
import users from "./users";
import invitations from "./invitations";
import members from "./members";
import notes from "./notes";
import memberSalesAgreements from "./member-sales-agreements";
import memberSalesAgreementFreezes from "./member-sales-agreement-freezes";
import presentationDecks from "./presentation-decks";
import roles from "./roles";
import forms from "./forms";
import formFields from "./form-fields";
import formContactFields from "./form-contact-fields";
import tasks from "./tasks";
import answers from "./answers";
import reports from "./reports";
import boards from "./boards";
import groupAssessments from "./group-assessments";
import memberPresentationDecks from "./member-presentation-decks";
import userNotes from "./user-notes";
import quickLinks from "./quick-links";
import sessions from "./sessions";
import assessments from "./assessments";
import gymRevenue from "./gym-revenue";
import gymImportHistory from "./gym-import-history";
import organizationImportHistory from "./organization-import-history";

const persistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, auth);

const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    adminRoles,
    adminUsers,
    adminOrganizations,
    adminPermissions,
    organizations,
    settings,
    gyms,
    salesAgreements,
    invitations,
    groups,
    users,
    members,
    notes,
    memberSalesAgreements,
    presentationDecks,
    roles,
    forms,
    formFields,
    formContactFields,
    tasks,
    memberSalesAgreementFreezes,
    memberPresentationDecks,
    answers,
    reports,
    groupAssessments,
    boards,
    userNotes,
    quickLinks,
    sessions,
    assessments,
    gymRevenue,
    gymImportHistory,
    organizationImportHistory,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
