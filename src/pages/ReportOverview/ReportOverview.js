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
                        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4Mzk0OTg3NywibmJmIjoxNjgzOTQ5ODc3LCJleHAiOjE2ODM5NTUzODMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFYNStkaGp4MDFLOTNkT3A4ZFZPK1lMTXAweTl4dzE3MGRBcDloNVJ6dDQxU1hYZ0k4UXpNcUNTb25rVDJGYUtzL2ZWaWFJTkhBbkdwbHpPUklRR0VHL0wySTE0ZVZRRVFzSUp1WWEvNVBsdz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMTAzLjIxMy4xMjIuMjUyIiwibmFtZSI6IkhpZXUgSHV5bmgiLCJvaWQiOiJlZTgyZjZmOC0wY2I2LTQxOGItYjc1Ni1hNDRmN2ZlYWNiOTAiLCJwdWlkIjoiMTAwMzIwMDI5MzNGRUVDNCIsInJoIjoiMC5BVW9BX3BtaVl0NktaRUN4ci1tSDF0ek5zUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0pBSkkuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiRE1OYkY5RFlnZzE2OGhxX2pSbGFzcTJRbVlZQVVtLXhwNnF3RzZlMk83byIsInRpZCI6IjYyYTI5OWZlLThhZGUtNDA2NC1iMWFmLWU5ODdkNmRjY2RiMSIsInVuaXF1ZV9uYW1lIjoiSGlldUh1eW5oQGhpZXVodXluaDg5MC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6Ikxoa0pRYVJPbTBDZmhrcUJVNVl4QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.EEiwYXdoe3bSFzA0UUWgzmqF-rUNt0R_AzjHlOSLr5A6Py28PgywVAvcSTdZbHAw8i31Yv0f_oftUfh8-B1ix6yTTWFe5WIeVaotJqvtHjOXHqD26Q52zTisAn9NBdjvtVXeUO2uvUd3s7q1s2AMCqc54EkOUe1HAlbzX94yhto3EP95iPe7Vsx-vZjuS_qZktCw6FSrAbyg2HZpS9CDcnFaFAkqNJAG7zawGxTH3KWOGwKt-dx4yZqhg9xdjy_jJjSKNFXaT4zWv812s2zTfScQ4KcD1tKDNAqyZ0GNDa4QjakX6kn9y6BIZ3hrpIvbsq7TNcWa-rHmbgSyM54Kmg',
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
                        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4Mzk0OTg5MCwibmJmIjoxNjgzOTQ5ODkwLCJleHAiOjE2ODM5NTUyMDMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFVZFhBeHJHQ1N5ZDJXOUV2SVVwcEM4VTdqaE9kcGpVV2dFQlZ1MDJDZjJHUldGTkV5aWpqMW0wMC9Yb0FjU3VORGMrbmljRnIyK2M4ZXlhTTNIWlZzZmQyVzU2VTRBYm1qVnBWdHpVTzBOQT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMTAzLjIxMy4xMjIuMjUyIiwibmFtZSI6IkhpZXUgSHV5bmgiLCJvaWQiOiJlZTgyZjZmOC0wY2I2LTQxOGItYjc1Ni1hNDRmN2ZlYWNiOTAiLCJwdWlkIjoiMTAwMzIwMDI5MzNGRUVDNCIsInJoIjoiMC5BVW9BX3BtaVl0NktaRUN4ci1tSDF0ek5zUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0pBSkkuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiRE1OYkY5RFlnZzE2OGhxX2pSbGFzcTJRbVlZQVVtLXhwNnF3RzZlMk83byIsInRpZCI6IjYyYTI5OWZlLThhZGUtNDA2NC1iMWFmLWU5ODdkNmRjY2RiMSIsInVuaXF1ZV9uYW1lIjoiSGlldUh1eW5oQGhpZXVodXluaDg5MC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6Inc2em1PWGo4OVUtMW1ldElSM0pEQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.kCbbtvfpikV0tJNUaRle9zxPy1vqR8jMdn2f4OsUETRzUaocUT1pUahklMf4bKem9saf13piq0ED65muPVNoEXjynZSxh7FQ8fWlrLQQ_oVHUbDvw8QKNPv9rAdSL7xlWiPTAGPcD3pGpqGYV8_nyuqV6TC8_4lRbrL0EgcrEz7_TdAA2_Nb1iH574EY0do4yOLutg8F5mWJv6SS423Sd0HrQK-umigfjyk84liP-w7hec_oZRqHP6jS1LGA0fLsqoG7cB3DuZkU0DsjCxQ380fUvNZH4Yu4HEi-TtBM_6IR-QUwcXffytMaixO4HXDMrYFUjUZdJ3IgZ7makFZKuw',
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
