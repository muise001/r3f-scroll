export const Outro = ({ showOutro }) => {
    return (
        <div id="outro" className={showOutro ? 'visible' : ''}>
            <div id="credits">
                <p>Thanks for watching!!</p>
                <p>You can keep scrolling back and forth</p>

                <p>
                    This Amazing 3d Model was made by{' '}
                    <a
                        target="_blank"
                        href="https://sketchfab.com/luyssport"
                        rel="noreferrer"
                    >
                        Luysport
                    </a>
                </p>
            </div>
            <div id="controls">
                <p>Controls : </p>
                <p>use O to enable free-flight (Orbit Controls)</p>
                <p>use L to disable free-flight (Orbit Controls)</p>
            </div>{' '}
        </div>
    );
};
