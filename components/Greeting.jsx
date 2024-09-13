const Greeting = () => {
    return (
        <div className="text-tprimary">
            <h1 className="text-2xl font-bold">{new Date()?.toDateString()}</h1>
            <h1 className="text-4xl font-black tracking-tighter">Good afternoon, Gurvinder</h1>
        </div>
    );
};

export default Greeting;
