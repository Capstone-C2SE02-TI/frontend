import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import classNames from 'classnames/bind';
import styles from "./ReportOverview.module.scss"

const cx = classNames.bind(styles);

const WORLD_CHART_BI ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4Mzg1OTYxOCwibmJmIjoxNjgzODU5NjE4LCJleHAiOjE2ODM4NjM2MzAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUEvL0Y2V0sxWW9OeTMwTWIvTEhDdHdud0FSLzJJT0hLOXlBNnNyMzVxOTQ0WStkSEFvbmE3L3JXWHV0WktGVzBFK1JYdURDZTdpU1dabjFOOXhLQzRTcUFUWE84N243ODY5aXlwOWxML0VKVT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMS41NS4zNi4yMTIiLCJuYW1lIjoiSGlldSBIdXluaCIsIm9pZCI6ImVlODJmNmY4LTBjYjYtNDE4Yi1iNzU2LWE0NGY3ZmVhY2I5MCIsInB1aWQiOiIxMDAzMjAwMjkzM0ZFRUM0IiwicmgiOiIwLkFVb0FfcG1pWXQ2S1pFQ3hyLW1IMXR6TnNRa0FBQUFBQUFBQXdBQUFBQUFBQUFDSkFKSS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJETU5iRjlEWWdnMTY4aHFfalJsYXNxMlFtWVlBVW0teHA2cXdHNmUyTzdvIiwidGlkIjoiNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxIiwidW5pcXVlX25hbWUiOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6IkhpZXVIdXluaEBoaWV1aHV5bmg4OTAub25taWNyb3NvZnQuY29tIiwidXRpIjoiajFCWlBNQUtCMFdfMl9TRm9oZ21BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.bqIYc_4WgA08PVE5Yl8Z05MyaI_Hl-5NAkXojau2luU6hrFS-bqUinKTJGOS2tPETjyfJr-p0QSE_isCcFLVkSa6nxsK9VXAUk9gcbdSxKdgrgajf8VC7WUAx5XjHRPuvO4puxHyy3W02qaKR7V2z0mpp6yMxBCaKVif3O01B4rkJ8qSB5zbS1vcw_uqkqZNS46tST6vfT05K7tB4K8UgNLYBfztpZA6Ak__kJK4yJ9F9QiLkOCJdspgR7UcG9reBH_f5689V_sAH02DUcVCNhcPgk3LaExpA6fag372QzkUXuGgvvBtWfDJuhCCce5NZOjq4DfKNLm0OzAZ27SEPQ";
const COIN_CHART_BI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4Mzg1OTYwMCwibmJmIjoxNjgzODU5NjAwLCJleHAiOjE2ODM4NjQzMTIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUF6NTVmTXJNa0g3RGRmcnVYSEFQQ2ZwdjZISjlpOFphNnZxQmszdkQyRE5jMWZXWE9TMDRqRUlqTHFQczIzVS9mVFlGZ3VTRFh3ZFVUMGlvM29ZUUQ0bXl1dDNHRzc5WjVyVFZ5V2Z5S2RSST0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMS41NS4zNi4yMTIiLCJuYW1lIjoiSGlldSBIdXluaCIsIm9pZCI6ImVlODJmNmY4LTBjYjYtNDE4Yi1iNzU2LWE0NGY3ZmVhY2I5MCIsInB1aWQiOiIxMDAzMjAwMjkzM0ZFRUM0IiwicmgiOiIwLkFVb0FfcG1pWXQ2S1pFQ3hyLW1IMXR6TnNRa0FBQUFBQUFBQXdBQUFBQUFBQUFDSkFKSS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJETU5iRjlEWWdnMTY4aHFfalJsYXNxMlFtWVlBVW0teHA2cXdHNmUyTzdvIiwidGlkIjoiNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxIiwidW5pcXVlX25hbWUiOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6IkhpZXVIdXluaEBoaWV1aHV5bmg4OTAub25taWNyb3NvZnQuY29tIiwidXRpIjoiUlA1dFhZTjgxMGUtb2U5cGdqZEdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.bJmakf9YfBIR0t98nTOQqP33RFSzUwAQs14qFaghx1-itqnpAA9xq8G1_PstjORLFEsR25j0GPJMFAJ1RgdXINJG5-AAQLyOd_UPolp2mHmCCD4dmHfFlAziXvH3MT2i2vvmklqPxga1OH9QwIx0Ziih4dmTj91YJVnACrk6Ya9kNwsbSUzVEF7zelqfXFpWfEgImc6pzgX8YaonVjSl86HS9WH3F62fNN4bMn0Q8sAuUfjiWCoPtUkvAR6-XRNU8n4oafmMsSt4b2ignTJIJvlH8USZ7G21TthBOEGObiISiMpDrhDwOvtdEaynMSLkFzMe_jBjwraJQhbfUhSqNw ";


function ReportOverview() {
    return (
        <div style={{ width: '90%', height: '100vh' }}>
            <PowerBIEmbed
                embedConfig={{
                    type: 'report', // Supported types: report, dashboard, tile, visual and qna
                    id: '8d9501cf-82ac-40bb-a91e-3eca753d6ce0',
                    embedUrl:
                        'https://app.powerbi.com/reportEmbed?reportId=8d9501cf-82ac-40bb-a91e-3eca753d6ce0&groupId=7ae0bb22-58fa-474c-bd98-6c5a7901a8fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
                    accessToken: WORLD_CHART_BI,
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
                    accessToken:COIN_CHART_BI,
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
