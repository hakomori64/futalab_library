import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchGroups, selectGroup } from "../../../../store/groupSlice";

const GroupInviteSuccess = () => {
    const dispatch = useDispatch();
    const { loading, selectedGroupId, groups } = useSelector(selectGroup);

    useEffect(() => {
        (async () => {
            if (selectedGroupId != null) {
                dispatch(fetchGroups());
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
        <Container>
            <p>入力されたemail宛てにグループ{group.name}への招待を送信しました。</p>
            <p>招待したいユーザーさんがまだサインアップしていない場合、パスワード変更リンクを送信していますので、そのリンクからパスワードをリセットし、システムにログインするようにお伝えください。</p>
        </Container>
    )
}

export default GroupInviteSuccess;