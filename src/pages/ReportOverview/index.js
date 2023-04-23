
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";


function ReportOverview() {
  return (
    <div style={{ width: '90%' }}>
      <PowerBIEmbed
        embedConfig={{
          type: 'report', // Supported types: report, dashboard, tile, visual and qna
          id: '8d9501cf-82ac-40bb-a91e-3eca753d6ce0',
          embedUrl:
            'https://app.powerbi.com/reportEmbed?reportId=8d9501cf-82ac-40bb-a91e-3eca753d6ce0&groupId=7ae0bb22-58fa-474c-bd98-6c5a7901a8fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
          accessToken:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4MjI2NDU3MiwibmJmIjoxNjgyMjY0NTcyLCJleHAiOjE2ODIyNzAwNjksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUEzYjlpWE9pMFhzTnZVeE1FQnliQmtLVGdPT0tkS1k2Y1hJeDAvL1llS1R1bVJSQUo1dmw5OFdiQjhVc2Rsd2dCRlJEazdQWGdFenc1ajZ2Y0k4K0hJRU81ZjZRK1N5WGppVHdCaXJKTEEvST0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMTgzLjgxLjEyNy4yMDMiLCJuYW1lIjoiSGlldSBIdXluaCIsIm9pZCI6ImVlODJmNmY4LTBjYjYtNDE4Yi1iNzU2LWE0NGY3ZmVhY2I5MCIsInB1aWQiOiIxMDAzMjAwMjkzM0ZFRUM0IiwicmgiOiIwLkFVb0FfcG1pWXQ2S1pFQ3hyLW1IMXR6TnNRa0FBQUFBQUFBQXdBQUFBQUFBQUFDSkFKSS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJETU5iRjlEWWdnMTY4aHFfalJsYXNxMlFtWVlBVW0teHA2cXdHNmUyTzdvIiwidGlkIjoiNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxIiwidW5pcXVlX25hbWUiOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6IkhpZXVIdXluaEBoaWV1aHV5bmg4OTAub25taWNyb3NvZnQuY29tIiwidXRpIjoiQTA2LU5IWHIta3Fkb1dNcUpJSVVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.aHB6VKmCE8zBTo8_sU4LlrmPJJiZz8TcKhs4allU4bQvvbHwNXwGdpdDuejGF_9rJHYlGj5O65cHttd1IjrE-qfs56Qp60KisGJWiSKy86liTKgWDnzylOdKoi6EvcLUNXYRNmiywp7YL4_6SyBlrDKiN9aYZZLiXvOpyJuHahgPDzXijNjkt11w_LS04KkDUfyWLBEMG7LbbL582e9xAnYty4k0vzDnWKzFZ-WxDCe2zW0to-VZfK7atTJD2bWPHGxK56zNHA5PETBIg8vOrANhzLhZnCPZBGSoTUEwGFG2ne9sqmrm_uyrHmUfKVlBTqzmGabTudUTr7tFRvQKtA',
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
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxLyIsImlhdCI6MTY4MjI2NDU3MiwibmJmIjoxNjgyMjY0NTcyLCJleHAiOjE2ODIyNzAwNjksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUEzYjlpWE9pMFhzTnZVeE1FQnliQmtLVGdPT0tkS1k2Y1hJeDAvL1llS1R1bVJSQUo1dmw5OFdiQjhVc2Rsd2dCRlJEazdQWGdFenc1ajZ2Y0k4K0hJRU81ZjZRK1N5WGppVHdCaXJKTEEvST0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJIdXluaCIsImdpdmVuX25hbWUiOiJIaWV1IiwiaXBhZGRyIjoiMTgzLjgxLjEyNy4yMDMiLCJuYW1lIjoiSGlldSBIdXluaCIsIm9pZCI6ImVlODJmNmY4LTBjYjYtNDE4Yi1iNzU2LWE0NGY3ZmVhY2I5MCIsInB1aWQiOiIxMDAzMjAwMjkzM0ZFRUM0IiwicmgiOiIwLkFVb0FfcG1pWXQ2S1pFQ3hyLW1IMXR6TnNRa0FBQUFBQUFBQXdBQUFBQUFBQUFDSkFKSS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJETU5iRjlEWWdnMTY4aHFfalJsYXNxMlFtWVlBVW0teHA2cXdHNmUyTzdvIiwidGlkIjoiNjJhMjk5ZmUtOGFkZS00MDY0LWIxYWYtZTk4N2Q2ZGNjZGIxIiwidW5pcXVlX25hbWUiOiJIaWV1SHV5bmhAaGlldWh1eW5oODkwLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6IkhpZXVIdXluaEBoaWV1aHV5bmg4OTAub25taWNyb3NvZnQuY29tIiwidXRpIjoiQTA2LU5IWHIta3Fkb1dNcUpJSVVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.aHB6VKmCE8zBTo8_sU4LlrmPJJiZz8TcKhs4allU4bQvvbHwNXwGdpdDuejGF_9rJHYlGj5O65cHttd1IjrE-qfs56Qp60KisGJWiSKy86liTKgWDnzylOdKoi6EvcLUNXYRNmiywp7YL4_6SyBlrDKiN9aYZZLiXvOpyJuHahgPDzXijNjkt11w_LS04KkDUfyWLBEMG7LbbL582e9xAnYty4k0vzDnWKzFZ-WxDCe2zW0to-VZfK7atTJD2bWPHGxK56zNHA5PETBIg8vOrANhzLhZnCPZBGSoTUEwGFG2ne9sqmrm_uyrHmUfKVlBTqzmGabTudUTr7tFRvQKtA',
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
