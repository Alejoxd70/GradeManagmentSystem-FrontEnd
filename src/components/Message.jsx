import Alert from "react-bootstrap/Alert"
import PropTypes from "prop-types"

const Message = ({message}) => {

    return (
        <Alert variant={message.variant} className="my-3 text-center">
            {message.text}
        </Alert>
    )
}

Message.propTypes = {
    message: PropTypes.object
}


export default Message;