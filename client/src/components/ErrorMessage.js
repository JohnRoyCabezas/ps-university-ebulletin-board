export default function ErrMsg(props) {
    return (
        <p
            className={props.error ? "text-red-400 text-xs my-5 absolute" : "offscreen"}
        >
            {props.error}
        </p>
    );
}
