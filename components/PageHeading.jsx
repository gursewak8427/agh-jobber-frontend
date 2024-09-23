const PageHeading = ({ title, children }) => {
    return (
        <div className="text-tprimary flex items-center justify-between">
            {
                title &&
                <h1 className="text-4xl font-black tracking-tighter">{title}</h1>
            }
            {children}
        </div>
    );
};

export default PageHeading;
