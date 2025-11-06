export const fmsScoreDropdown = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
];

export const fmsScoreTooltip = (
    <>
        <p className="font-bold">Scoring:</p>
        <p>0=Pain</p>
        <p>1=Unable to perform at the lowest level</p>
        <ul className="list-disc list-inside">
            <li>Shoulder Mobility 1.5+ hand lengths </li>
        </ul>
        <p>2=Performed with compensation </p>
        <ul className="list-disc list-inside">
            <li>Shoulder Mobility 1.5 hand lengths </li>
        </ul>
        <p>3=Performed without compensation </p>
        <ul className="list-disc list-inside">
            <li>Shoulder Mobility -1 hand lengths </li>
        </ul>
    </>
);
