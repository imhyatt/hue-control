export interface Light {
    id: number;
    state: {
        on: Boolean;
        bri?: Number;
        hue?: Number;
        sat?: Number;
        xy?: Number[];
        hexColor?: String;
        effect?: String;
        alert?: String;
        mode?: String;
        reachable?: Boolean;
    };
    swupdate?: {
        state: String;
        lastinstall: String;
    };
    type?: String;
    name?: String;
    modelid?: String;
    manufacturername?: String;
    productname?: String;
    capabilities?: {
        certified: Boolean;
        control: {
            mindimlevel: Number;
            maxlumen: Number;
        }
        streaming: {
            renderer: Boolean;
            proxy: Boolean;
        }
    };
    config?: {
        archetype: String;
        function: String;
        direction: String;
        startup: {
            mode: String;
            configured: Boolean;
        }
    };
    uniqueid?: String;
    swversion?: String;
}

export interface HsiColor {
    h: number;
    s: number;
    i: number;
}