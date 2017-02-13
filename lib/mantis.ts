import * as Soap from "soap";
import * as Request from "request";

export class MantisConnect {
    private url: string;
    private port: string;
    private client: Soap.Client;
    private username: string;
    private password: string;
    private req: Request.Request;

    constructor(url: string, username: string, password: string) {
        this.url = url;
        this.username = username;
        this.password = password;
        this.client = null;
    };

    public initialize() {
        return new Promise((resolve, reject) => {
            Soap.createClient(this.url, {}, (err, client) => {
                if (err) {
                    console.error(err);
                    return reject("Failed to create client.");
                }

                this.client = client;

                return resolve();

            });
        });
    };

    public getUserIssues() {
        return this.query("mc_project_get_issues_for_user", {
            username: this.username,
            password: this.password,
            target_user: {
                name: this.username
            },
            project_id: 0,
            page_number: 0,
            per_page: -1,
            filter_type: "assigned",
        })
        .then((result) => {
            return result.return;
         });
    };

    private query(func: any, args: any): Promise<any> {
        // Set username and password
        args.username = this.username;
        args.password = this.password;
        return new Promise((resolve, reject) => {
            this.client[func](args, (err, result) => {
                if (err) {
                    console.error(err);
                    return reject("Failed to execute query '" + func + "'.");
                }
                return resolve(result);
            });
        });
};

}