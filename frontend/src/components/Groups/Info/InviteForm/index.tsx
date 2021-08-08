import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { Group } from "./../../../../types";

const InviteForm = ({ group }: { group: Group }) => {

    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");

    const [error, setError] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEmailErr("");

        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        let errorOccured = false;

        if (!email.match(regexp)) {
            setEmailErr("有効なメールアドレスではありません。");
            errorOccured = true;
        }

        if (!errorOccured) {
            // send email to invite user
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="招待したいユーザーのメールアドレスを入力してください"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailErr !== "" && <span className="small text-danger">{emailErr}</span>}
            </Form.Group>
            {error !== "" && <span className="small text-danger">{error}</span>}
            <Button type="submit">送信</Button>
        </Form>
    );
}

export default InviteForm;