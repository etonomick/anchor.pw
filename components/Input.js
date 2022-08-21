export default function Input({ placeholder, type = "text", input, onChange, onClick }) {
    return (
        <div className="flex flex-col gap-5 max-w-md">
            <div className="flex flex-row items-center max-w-full text-2xl md:text-3xl lg:text-4xl">
                {placeholder && <div className="text-neutral-800 select-none">anchor.pw/</div>}
                <input
                    className="appearance-none focus:outline-none bg-transparent w-full"
                    type={type}
                    value={input.value}
                    onChange={onChange} />
                <div className="select-none cursor-pointer" onClick={onClick}>&rarr;</div>
            </div>
            {input.error && input.error}
        </div>
    )
}