import React from "react";

// FMS
import Power from "../../../../../assets/icons/fms/power.svg";
import Stability from "../../../../../assets/icons/fms/stability.svg";
import Strength from "../../../../../assets/icons/fms/strength.svg";

// Performance Test
import OptimalLife from "../../../../../assets/icons/performance-test/optimal-life.svg";
import Standard from "../../../../../assets/icons/performance-test/standard.svg";

// Health
import BoneIssue from "../../../../../assets/icons/health/bone-issue.svg";
import Diabetes from "../../../../../assets/icons/health/diabetes.svg";
import Dizziness from "../../../../../assets/icons/health/dizziness.svg";
import HighBloodPressure from "../../../../../assets/icons/health/high-blood-pressure.svg";
import MedicalCondition from "../../../../../assets/icons/health/medical-condition.svg";
import Medications from "../../../../../assets/icons/health/medications.svg";
import MentalHealth from "../../../../../assets/icons/health/mental-health.svg";
import Respiratory from "../../../../../assets/icons/health/respiratory.svg";
import Surgery from "../../../../../assets/icons/health/surgery.svg";
import Stroke from "../../../../../assets/icons/health/stroke.svg";
import ChestPain from "../../../../../assets/icons/health/chest-pain.svg";
import HeartDisease from "../../../../../assets/icons/health/heart-disease.svg";

//Other

import Active from "../../../../../assets/icons/active.svg";
import Inactive from "../../../../../assets/icons/inactive.svg";

import ActivePT from "../../../../../assets/icons/active-pt-sales.svg";
import InactivePT from "../../../../../assets/icons/inactive-pt-sales.svg";

import Frozen from "../../../../../assets/icons/frozen.svg";

import CoachedClient from "../../../../../assets/icons/coached-client.svg";
import ColdNo from "../../../../../assets/icons/cold-no.svg";
import ContactCall from "../../../../../assets/icons/contact-call.svg";
import ContactDoNotCall from "../../../../../assets/icons/contact-do-not-call.svg";
import ContactMoved from "../../../../../assets/icons/contact-moved.svg";
import FCScheduled from "../../../../../assets/icons/fc-scheduled.svg";
import GymTourBooked from "../../../../../assets/icons/gym-tour-booked.svg";
import JS1Completed from "../../../../../assets/icons/js1-completed.svg";
import JS1Scheduled from "../../../../../assets/icons/js1-scheduled.svg";
import JS3Scheduled from "../../../../../assets/icons/js-3-scheduled.svg";
import JS3ScheduledGrey from "../../../../../assets/icons/js-3-scheduled-grey.svg";
import LowPriority from "../../../../../assets/icons/low-priority.svg";
import Member from "../../../../../assets/icons/member.svg";
import PriorityHigh from "../../../../../assets/icons/priority-high.svg";
import PriorityLow from "../../../../../assets/icons/priority-low.svg";
import PriorityMedium from "../../../../../assets/icons/priority-medium.svg";
import Prospect from "../../../../../assets/icons/prospect.svg";
import WarmNo from "../../../../../assets/icons/warm-no.svg";
import NewClientOnboarding from "../../../../../assets/icons/new-client-onboarding.svg";
import Assessment from "../../../../../assets/icons/assessment.svg";
import Leads from "../../../../../assets/icons/leads.svg";
import OfficeStaff from "../../../../../assets/icons/office-staff.svg";
import AutoRenew from "../../../../../assets/icons/auto-renew.svg";
import AutoRenewGrey from "../../../../../assets/icons/auto-renew-grey.svg";
import JS1CompletedGrey from "../../../../../assets/icons/js1-completed-grey.svg";
import JS1ScheduledGrey from "../../../../../assets/icons/js1-scheduled-grey.svg";

interface Props {
    icon: string;
    className?: string;
}

const iconMapping: Record<
    string,
    {
        text: string;
        component: string;
    }
> = {
    power: { text: "Power", component: Power },
    stability: { text: "Stability", component: Stability },
    strength: { text: "Strength", component: Strength },
    optimalLife: { text: "Optimal Life", component: OptimalLife },
    standard: { text: "Standard", component: Standard },
    boneIssue: { text: "Bone Issue", component: BoneIssue },
    diabetes: { text: "Diabetes", component: Diabetes },
    dizziness: { text: "Dizziness", component: Dizziness },
    highBloodPressure: {
        text: "High Blood Pressure",
        component: HighBloodPressure,
    },
    medicalCondition: {
        text: "Medical Condition",
        component: MedicalCondition,
    },
    medications: { text: "Medications", component: Medications },
    mentalHealth: { text: "Mental Health", component: MentalHealth },
    respiratory: { text: "Respiratory", component: Respiratory },
    surgery: { text: "Surgery", component: Surgery },
    stroke: { text: "Stroke", component: Stroke },
    chestPain: { text: "Chest Pain", component: ChestPain },
    heartDisease: { text: "Heart Disease", component: HeartDisease },
    active: { text: "Active", component: Active },
    inactive: { text: "Inactive", component: Inactive },
    activePT: { text: "Active", component: ActivePT },
    inactivePT: { text: "Inactive", component: InactivePT },
    frozen: { text: "Frozen", component: Frozen },
    coachedClient: { text: "Coached Client", component: CoachedClient },
    coldNo: { text: "Cold No", component: ColdNo },
    contactCall: { text: "Call", component: ContactCall },
    contactDoNotCall: {
        text: "Do Not Call",
        component: ContactDoNotCall,
    },
    contactMoved: { text: "Moved", component: ContactMoved },
    fcScheduled: { text: "FC Scheduled", component: FCScheduled },
    gymTourBooked: { text: "Gym Tour Booked", component: GymTourBooked },
    js1Completed: { text: "JS1 Completed", component: JS1Completed },
    js3Completed: { text: "JS3 Completed", component: JS1Completed },
    js1Scheduled: { text: "JS1 Scheduled", component: JS1Scheduled },
    js3Scheduled: { text: "JS3 Scheduled", component: JS3Scheduled },
    js3ScheduledGrey: {
        text: "JS3 Scheduled Grey",
        component: JS3ScheduledGrey,
    },
    lowPriority: { text: "Low Priority", component: LowPriority },
    member: { text: "Member", component: Member },
    priorityHigh: { text: "Priority High", component: PriorityHigh },
    priorityLow: { text: "Priority Low", component: PriorityLow },
    priorityMedium: { text: "Priority Medium", component: PriorityMedium },
    prospect: { text: "Prospect", component: Prospect },
    warmNo: { text: "Warm No", component: WarmNo },
    newClientOnboarding: {
        text: "New Client Onboarding",
        component: NewClientOnboarding,
    },
    assessment: { text: "Assessment", component: Assessment },
    leads: { text: "Leads", component: Leads },
    officeStaff: { text: "Office Staff", component: OfficeStaff },
    autoRenew: { text: "Auto Renew", component: AutoRenew },
    autoRenewGrey: { text: "Auto Renew Grey", component: AutoRenewGrey },
    js1CompletedGrey: {
        text: "JS1 Completed Grey",
        component: JS1CompletedGrey,
    },
    js3CompletedGrey: {
        text: "JS3 Completed Grey",
        component: JS1CompletedGrey,
    },
    js1ScheduledGrey: {
        text: "JS1 Scheduled Grey",
        component: JS1ScheduledGrey,
    },
};

const CustomIcon: React.FC<Props> = ({ icon, className }) => {
    const iconInfo = iconMapping[icon];

    if (!iconInfo) return null;

    const { component, text: iconText } = iconInfo;

    return (
        <img
            src={component}
            alt={iconText}
            title={iconText}
            className={className}
        />
    );
};

export default CustomIcon;
