import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchInvitations, selectInvitation } from "../../store/invitationSlice";
import { fetchGroups, setSelectedGroupId } from "../../store/groupSlice";
import { acceptInvitation, discardInvitation } from "../../repositories/invitationRepository";


const Invitations = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthenticated } = useAuth0();
    const { invitations, loading } = useSelector(selectInvitation);
    
    useEffect(() => {
        (async () => {
            if (isAuthenticated) {
                dispatch(fetchInvitations());
            }
        })();
    }, [dispatch, isAuthenticated]);

    if (loading) {
        return (<div>loading...</div>);
    }

    if (invitations.length === 0) {
        return (<div>招待はありません。</div>);
    }

    return (
        <Container>
            {invitations.map((invitation) => {
                return (
                    <Container className="bg-light shadow my-3 p-3 border border-light rounded" >
                        <Row className="align-items-center justify-content-start">
                            <Col lg={6}>
                                <Row className="h5">{invitation.group.name.slice(0, 20) + (invitation.group.name.length > 20 ? '...' : '')}</Row>
                            </Col>
                            <Col xs={2}>
                                <Button onClick={async () => {
                                    // accept request to backend
                                    try {
                                        await acceptInvitation(invitation.id);
                                        dispatch(fetchGroups());
                                        dispatch(setSelectedGroupId(invitation.group_id));
                                        history.replace('/books');
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}>
                                    承認する
                                </Button>
                                <Button onClick={async () => {
                                    // discard invitation request to backend
                                    await discardInvitation(invitation.id);
                                    dispatch(fetchInvitations());
                                }}>
                                    拒否する
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                )
            })}
        </Container>
    )
}

export default Invitations;