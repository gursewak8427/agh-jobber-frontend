const Greeting = ({ profile }) => {
    const currentHour = new Date().getHours(); // Get the current hour (0-23)

    let greetingMessage;

    if (currentHour < 12) {
        greetingMessage = "Good Morning";
    } else if (currentHour < 18) {
        greetingMessage = "Good Afternoon";
    } else {
        greetingMessage = "Good Evening";
    }

    return (
        <div className="z-0 text-tprimary dark:text-dark-text dark:bg-dark-secondary ">
            <h1 className="text-2xl font-bold">{new Date().toDateString()}</h1>
            <h1 className="text-4xl font-black tracking-tighter">
                {greetingMessage}, {profile.name}
            </h1>
        </div>
    );
};

export default Greeting;

