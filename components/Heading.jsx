const Heading = ({ title }) => {
    return (
        <div className="text-tprimary dark:text-dark-text dark:bg-dark-secondary">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
};

export default Heading;
