import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { fetchGroups } from "store/groupSlice";
import { createGroup } from "repositories/groupRepository";
import { useDispatch } from "react-redux";

const GroupCreate = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState("");

    const [error, setError] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setNameErr("");

        let errorOccured = false;
        if (name.length === 0) {
            setNameErr("グループ名を入力してください");
            errorOccured = true;
        }

        if (!errorOccured) {
            try {
                await createGroup({
                    name: name
                });
                dispatch(fetchGroups())
                history.replace('/home')
            } catch (error) {
                setError('グループの作成中にエラーが発生しました');
            }
        }
    }

    return (
        <>
        <h1>グループを登録する</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>グループ名</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="グループ名を入力してください"
                  value={name}
                  onChange={handleNameChange}
                />
                {nameErr !== "" && <span className="small text-danger">{nameErr}</span>}
            </Form.Group>
            {error && <span className="small text-danger">{error}</span>}
            <Button type="submit">送信</Button>
        </Form>
        </>
    )
}

export default GroupCreate;