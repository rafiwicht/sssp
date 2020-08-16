import React, {ChangeEvent, useState} from 'react';
import {SourcetypeInput} from "../../generated/graphql";
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import tomorrow from 'react-syntax-highlighter/dist/esm/styles/prism';
import {createStyles, makeStyles} from "@material-ui/styles";



const useStyles = makeStyles(() =>
    createStyles({
        codeOutput: {

        },
        codeEditor: {

        }
    }),
);

type SourcetypeRawProps = {
    sourcetypeInput: SourcetypeInput
}

const SourcetypeRaw: React.FunctionComponent<SourcetypeRawProps> = () => {
    const classes = useStyles();


    const [text, setText] = useState("[test]\ngugus = gagas");
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }

    return (
        <div className="code-edit-container">
            <textarea
                className="code-input"
                onChange={handleChange}
                value={text}
            />
            <SyntaxHighlighter language="ini" style={tomorrow}>
                {text}
            </SyntaxHighlighter>
        </div>
    );
}

export default SourcetypeRaw;
