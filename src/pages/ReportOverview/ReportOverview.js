import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import classNames from 'classnames/bind';
import styles from "./ReportOverview.module.scss"

const cx = classNames.bind(styles);

function ReportOverview() {
    return (
        <div className={cx("report-overview")} style={{ width: '90%', height: '100vh' }}>
            <PowerBIEmbed
                embedConfig={{
                    type: 'report', // Supported types: report, dashboard, tile, visual and qna
                    id: '8d9501cf-82ac-40bb-a91e-3eca753d6ce0',
                    embedUrl:
                        'https://app.powerbi.com/reportEmbed?reportId=8d9501cf-82ac-40bb-a91e-3eca753d6ce0&groupId=7ae0bb22-58fa-474c-bd98-6c5a7901a8fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
                    accessToken:
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4NTc1MzYxNywibmJmIjoxNjg1NzUzNjE3LCJleHAiOjE2ODU3NTc4ODEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFXS3R3S1Z3MFFlMTZTMlUwNHZTaTJYcGY1b3dpVjkzcUh3U1g5bVozZWpLbi9ISlNhZUlMT0svOHR5K0lncXBnOS9jU3pZSVMrKysvalg1S3pkelZLTVltbEJVdkwvSGdmcklaQjdmTHdWbz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMTcxLjI0NC4xNjguMjEwIiwibmFtZSI6IkhpZXUgSHV5bmgiLCJvaWQiOiJlZTgyZjZmOC0wY2I2LTQxOGItYjc1Ni1hNDRmN2ZlYWNiOTAiLCJwdWlkIjoiMTAwMzIwMDI5MzNGRUVDNCIsInJoIjoiMC5BVW9BX3BtaVl0NktaRUN4ci1tSDF0ek5zUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0pBSkkuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiRE1OYkY5RFlnZzE2OGhxX2pSbGFzcTJRbVlZQVVtLXhwNnF3RzZlMk83byIsInRpZCI6IjYyYTI5OWZlLThhZGUtNDA2NC1iMWFmLWU5ODdkNmRjY2RiMSIsInVuaXF1ZV9uYW1lIjoiSGlldUh1eW5oQGhpZXVodXluaDg5MC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6InV4NzY3bmZQZFVlREVhbUNfUnVoQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.sDpSTxV1iWVkgauxivKntYweT5WVhWPexR5MnI7cC2jqcxeNPJnIdngWsCjLc3gw38iFZUlV5oR_4_HWYcQBKotpr-J1KSldVbrrUtnIWjlc58T24VEzdA41itT3e__2kVESi9o0zVrZcstT07rF9TCGX2qyI9N55GiWRnd4Ref9GyhHPfPRULESW6xyMjZtatCZ-U8hyIUxlXXRvXfzSQ7kfXPf24Wi0eWWzaHktplSXvWUhWKrBNUneWZ2sLI1__RjTfwiPNM5LeXMZSGVG1BJzBRmN4MO7RZHLrBBFMmc5NEWNlg5nK21wbSqdMDmDP4SlbU2D2iUAEjmAS_kGQ",
                    tokenType: models.TokenType.Aad,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: false,
                            },
                        },
                        background: models.BackgroundType.Default,
                    },
                }}
                eventHandlers={
                    new Map([
                        [
                            'loaded',
                            function () {
                                console.log('Report loaded');
                            },
                        ],
                        [
                            'rendered',
                            function () {
                                console.log('Report rendered');
                            },
                        ],
                        [
                            'error',
                            function (event) {
                                console.log(event.detail);
                            },
                        ],
                    ])
                }
                cssClassName={'report-style-class'}
                getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                }}
            />
            <h2>Cryptocurrency Dashboard</h2>

            <PowerBIEmbed
                embedConfig={{
                    type: 'report', // Supported types: report, dashboard, tile, visual and qna
                    id: 'ab867951-2182-4d88-902e-ae047a3a5123',
                    embedUrl:
                        'https://app.powerbi.com/reportEmbed?reportId=ab867951-2182-4d88-902e-ae047a3a5123&groupId=7ae0bb22-58fa-474c-bd98-6c5a7901a8fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
                    accessToken:
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4NTc1MzQ2NCwibmJmIjoxNjg1NzUzNDY0LCJleHAiOjE2ODU3NTgxMjEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFUSlo2eXplYnFaWUxUU1ljY1MyMUZiK2RMNjRySEFLY0JSUk5JR05nM3gvL0hqZ2pTbVd2dWgvUTNBRWN2Znh2Z3Y3NWY3UHBJY3dVMzdDejd2K1Q1SHMzU0tnU2RiWE94WnhJWWxWMmdyUT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMTcxLjI0NC4xNjguMjEwIiwibmFtZSI6IkhpZXUgSHV5bmgiLCJvaWQiOiJlZTgyZjZmOC0wY2I2LTQxOGItYjc1Ni1hNDRmN2ZlYWNiOTAiLCJwdWlkIjoiMTAwMzIwMDI5MzNGRUVDNCIsInJoIjoiMC5BVW9BX3BtaVl0NktaRUN4ci1tSDF0ek5zUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0pBSkkuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiRE1OYkY5RFlnZzE2OGhxX2pSbGFzcTJRbVlZQVVtLXhwNnF3RzZlMk83byIsInRpZCI6IjYyYTI5OWZlLThhZGUtNDA2NC1iMWFmLWU5ODdkNmRjY2RiMSIsInVuaXF1ZV9uYW1lIjoiSGlldUh1eW5oQGhpZXVodXluaDg5MC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6IjgzMkRFa1pUTUVHU1pqSnYxZlU1QVEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.Tfec7OX_5VEu1ayRu4RlQM7mC8AAKhzT4siyb-KF3VZNRtuMwaY2Ik4nbjuthHgiSENEG_11ZNJqibzGV-79wV-53WAv9k4nE1QRRLbrgb71d6kqiN3f200Cx4xNqCsDVL3sHBdHJJ6iq2VNd1jBYKCf82hG3XJiKPqFCP-Bo3sOozn4jD-BD53ihyrO8TkNRSQ2gnwLuSE8bq6kzJQWXS0cnZWDfIzkxiKqToIHF1FUt0gTHjnm7T3LOkdIKQp-2S2ZnHdgGcmchP8wI0WLhvZSGkQT76UI9y3sFi8Mu6oija-HrZCIJ3tT73UYqHX5l1OTVy4HHbd-2jQrqVBiqA",
                    tokenType: models.TokenType.Aad,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: false,
                            },
                        },
                        background: models.BackgroundType.Default,
                    },
                }}
                eventHandlers={
                    new Map([
                        [
                            'loaded',
                            function () {
                                console.log('Report loaded');
                            },
                        ],
                        [
                            'rendered',
                            function () {
                                console.log('Report rendered');
                            },
                        ],
                        [
                            'error',
                            function (event) {
                                console.log(event.detail);
                            },
                        ],
                    ])
                }
                cssClassName={'report-style-class'}
                getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                }}
            />
            <h2>Cryptocurrency Pricing Information</h2>
        </div>
    );
}

export default ReportOverview;
