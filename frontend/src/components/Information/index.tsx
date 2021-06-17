import { FC } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
    RouteComponentProps
} from 'react-router-dom';
import noimage from "./../../img/NoImage.svg";

type BookIdProps = RouteComponentProps<{
    id: string;
}>;

const Information: FC<BookIdProps> = (props) => {
    const id = props.match.params.id;

    return (
        <>
            <h1>This is book {id} information page.</h1>
            <img src={noimage} />
            <h1>Hoge</h1>
            <LinkContainer to={'/borrow/'+id}>
                <Button>
                    借りる
                </Button>
            </LinkContainer>
            <Table>
                <tbody>
                    <tr>
                        <th>ISBN</th>
                        <td>XXXXXXXXXX</td>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <td>{id}</td>
                    </tr>
                    <tr>
                        <th>残り冊数/最大</th>
                        <td>X/Y</td>
                    </tr>
                    <tr>
                        <th>Last update</th>
                        <td>YYYY/MM/DD</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default Information;