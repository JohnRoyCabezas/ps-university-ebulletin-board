export default function ErrMsg(props) {
    return (
        <span className={props.error ? "fixed text-red-400 text-xs my-5" : "offscreen"}
        >
            {props.error}
        </span>
    );
}
