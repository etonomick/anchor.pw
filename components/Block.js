export default function Block({ type, children }) {

    const types = {
        "text": {
            "type": {
                "sans": "font-sans"
            }
        }
    }

    return (
        <div className={``}>
            {children}
        </div>
    )
}