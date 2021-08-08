import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Group } from "../../types";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { fetchGroups, selectGroup, setSelectedGroupId } from "./../../store/groupSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCog } from '@fortawesome/free-solid-svg-icons'


const Groups = () => {
    const dispatch = useDispatch();
    const { groups, selectedGroupId, error, loading } = useSelector(selectGroup);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            dispatch(fetchGroups());
        })();
    }, [dispatch])
    return (
        <Container>
            {groups.map((group: Group) => {
                return (
                    <Container className='bg-light shadow my-3 p-3 border border-light rounded' style={{background: "#eeeeee"}}>
                        <Row>
                            <Container>
                                <Row className="align-items-center justify-content-start">
                                    <Col lg={6}>
                                        <Row className="h5">{group.name.slice(0, 20) + (group.name.length > 20 ? '...' : '')}</Row>
                                        <Row><span>{group.users.length}人のメンバー</span></Row>
                                    </Col>
                                    <Col xs={2}>
                                        <Button onClick={() => {
                                            dispatch(setSelectedGroupId(group.id));
                                            history.replace('/books');
                                        }}>
                                            開く
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </Button>
                                    </Col>
                                    <Col xs={2}>
                                        <LinkContainer to={`/groups/${group.id}`}>
                                            <Button variant="secondary">
                                                設定
                                                <FontAwesomeIcon icon={faCog} />
                                            </Button>
                                        </LinkContainer>
                                    </Col>
                                </Row>
                            </Container>
                        </Row>
                    </Container>
                );
            })}
        </Container>
    )
}

export default Groups;