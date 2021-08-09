import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { fetchGroups, selectGroup } from "../../../store/groupSlice";
import InviteForm from "./InviteForm";
import { fetchInvitations, selectGroupInvitation } from "store/groupInvitationSlice";
import { useParams } from "react-router-dom";

type GroupInfoParams = {
    id: string;
};

const GroupInfo = () => {
    const { id } = useParams<GroupInfoParams>();
    const dispatch = useDispatch();
    const { loading, selectedGroupId, groups } = useSelector(selectGroup);
    const { invitations } = useSelector(selectGroupInvitation);

    useEffect(() => {
        (async () => {
            if (groups.length === 0) {
                dispatch(fetchGroups());
                dispatch(fetchInvitations(+id));
            }
        })();
    }, [dispatch]);

    if (loading) {
        return (<div>loading...</div>);
    }

    const group = groups.find((group) => group.id === +id);
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