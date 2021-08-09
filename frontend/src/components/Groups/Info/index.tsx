import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { fetchGroups, selectGroup } from "../../../store/groupSlice";
import InviteForm from "./InviteForm";
import { fetchInvitations, selectInvitation } from "store/invitationSlice";

type GroupInfoParams = {
    id: string
}

const GroupInfo = () => {
    const dispatch = useDispatch();
    const { loading, selectedGroupId, groups } = useSelector(selectGroup);
    const { invitations } = useSelector(selectInvitation);

    useEffect(() => {
        (async () => {
            if (selectedGroupId != null) {
                dispatch(fetchGroups());
                dispatch(fetchInvitations(selectedGroupId));
            }
        })();
    }, [dispatch, selectedGroupId]);

    if (loading) {
        return (<div>loading...</div>);
    }

    const group = groups.find((group) => group.id === selectedGroupId);
    if (group === undefined) {
        return (<div>No such group</div>);
    }

    return (
        <>
        <h1>{group.name}</h1>
        <span>GID: {group.str_id}</span>

        <h4>メンバー</h4>
        <ol>
            {group.users.map((user) => (
                <li>{user.name}</li>
            ))}
        </ol>

        <h4>招待中</h4>
        <ol>
            {invitations.map((invitation) => (
                <li>{invitation.user.email}</li>
            ))}
        </ol>

        <h4>メンバーを招待</h4>
            <InviteForm group={group} />
        </>
    )
};

export default GroupInfo;