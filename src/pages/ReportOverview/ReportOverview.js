import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import classNames from 'classnames/bind';
import styles from "./ReportOverview.module.scss"

const cx = classNames.bind(styles);

function ReportOverview() {
    return (
        <div style={{ width: '90%', height: '100vh' }}>
            <PowerBIEmbed
                embedConfig={{
                    type: 'report', // Supported types: report, dashboard, tile, visual and qna
                    id: '8d9501cf-82ac-40bb-a91e-3eca753d6ce0',
                    embedUrl:
                        'https://app.powerbi.com/reportEmbed?reportId=8d9501cf-82ac-40bb-a91e-3eca753d6ce0&groupId=7ae0bb22-58fa-474c-bd98-6c5a7901a8fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
                    accessToken:
                        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4MjI5NjY5NCwibmJmIjoxNjgyMjk2Njk0LCJleHAiOjE2ODIzMDE0NDIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUF4UnE3RENONTQ3MFZib0ZSSGdsTUhhZnJIb0pBckgrTmhmNDVIQ3NUZkJpUGtYeXpPMmxvOTBsZ0FnemtKZTJDK3E3Z1k1NDdZNHRKNWowVjNuTEw2Q1Ivck5YUlQzcnliZjZ5eVI4L2Jmcz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMTAzLjIxMy4xMjIuMjUyIiwibmFtZSI6IkhpZXUgSHV5bmgiLCJvaWQiOiJlZTgyZjZmOC0wY2I2LTQxOGItYjc1Ni1hNDRmN2ZlYWNiOTAiLCJwdWlkIjoiMTAwMzIwMDI5MzNGRUVDNCIsInJoIjoiMC5BVW9BX3BtaVl0NktaRUN4ci1tSDF0ek5zUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0pBSkkuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiRE1OYkY5RFlnZzE2OGhxX2pSbGFzcTJRbVlZQVVtLXhwNnF3RzZlMk83byIsInRpZCI6IjYyYTI5OWZlLThhZGUtNDA2NC1iMWFmLWU5ODdkNmRjY2RiMSIsInVuaXF1ZV9uYW1lIjoiSGlldUh1eW5oQGhpZXVodXluaDg5MC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6IjJPY3dBOER4djBHeG9RczV4d280QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.T_Fb-bi6SHUi-Q1xgwew5mgL0xAqRrBqfmSS_wo-BF0OhfYeZpp1UX3gjlWt_pLc-flZPB8hqQn8a8HgUAA90RnakqdFPjpUOLGkQNvdv8j1MMTWL2Cm1ouHmSRcOD4uVBsexVVXxX51UNsdYmIn648uXMAiTFi35hYIOZakY8BmrsDB2MZI7Yj9PdAjSiZuUwjzrZoGvBSGWjsMSZ1av78UKzL6yo70FPEDUQ0PUGt8puMjoSA30uvREKSvEc-YEyu4i3fcuyIHoEMC0o8Qet9KOqgbCPOh0KG1a-3X5vQJKCjbb5UxycU3tbQSvyjVmmzMc3jOMGlS7xmtOKfHIA',
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
            <PowerBIEmbed
                embedConfig={{
                    type: 'report', // Supported types: report, dashboard, tile, visual and qna
                    id: 'ab867951-2182-4d88-902e-ae047a3a5123',
                    embedUrl:
                        'https://app.powerbi.com/reportEmbed?reportId=ab867951-2182-4d88-902e-ae047a3a5123&groupId=7ae0bb22-58fa-474c-bd98-6c5a7901a8fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
                    accessToken:
                        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4MjI5NjY5NCwibmJmIjoxNjgyMjk2Njk0LCJleHAiOjE2ODIzMDE0NDIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUF4UnE3RENONTQ3MFZib0ZSSGdsTUhhZnJIb0pBckgrTmhmNDVIQ3NUZkJpUGtYeXpPMmxvOTBsZ0FnemtKZTJDK3E3Z1k1NDdZNHRKNWowVjNuTEw2Q1Ivck5YUlQzcnliZjZ5eVI4L2Jmcz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMTAzLjIxMy4xMjIuMjUyIiwibmFtZSI6IkhpZXUgSHV5bmgiLCJvaWQiOiJlZTgyZjZmOC0wY2I2LTQxOGItYjc1Ni1hNDRmN2ZlYWNiOTAiLCJwdWlkIjoiMTAwMzIwMDI5MzNGRUVDNCIsInJoIjoiMC5BVW9BX3BtaVl0NktaRUN4ci1tSDF0ek5zUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0pBSkkuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiRE1OYkY5RFlnZzE2OGhxX2pSbGFzcTJRbVlZQVVtLXhwNnF3RzZlMk83byIsInRpZCI6IjYyYTI5OWZlLThhZGUtNDA2NC1iMWFmLWU5ODdkNmRjY2RiMSIsInVuaXF1ZV9uYW1lIjoiSGlldUh1eW5oQGhpZXVodXluaDg5MC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6IjJPY3dBOER4djBHeG9RczV4d280QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.T_Fb-bi6SHUi-Q1xgwew5mgL0xAqRrBqfmSS_wo-BF0OhfYeZpp1UX3gjlWt_pLc-flZPB8hqQn8a8HgUAA90RnakqdFPjpUOLGkQNvdv8j1MMTWL2Cm1ouHmSRcOD4uVBsexVVXxX51UNsdYmIn648uXMAiTFi35hYIOZakY8BmrsDB2MZI7Yj9PdAjSiZuUwjzrZoGvBSGWjsMSZ1av78UKzL6yo70FPEDUQ0PUGt8puMjoSA30uvREKSvEc-YEyu4i3fcuyIHoEMC0o8Qet9KOqgbCPOh0KG1a-3X5vQJKCjbb5UxycU3tbQSvyjVmmzMc3jOMGlS7xmtOKfHIA',
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
        </div>
    );
}

export default ReportOverview;
