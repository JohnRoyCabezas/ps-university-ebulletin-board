export default function ErrMsg(props) {
    return (
        <div className={props.error ? "fixed text-red-400 text-xs my-3" : "offscreen"}
        >
            {props.error}
        </div>
    );
}
