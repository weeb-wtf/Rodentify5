"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const GetServerInfo_1 = require("./GetServerInfo");
var Rodentify;
(function (Rodentify) {
    let _settings = { cookie: undefined };
    /**
     * Sets the cookie that should be used by default in all requests. If this is
     * not set and the request does not overwrite the cookie then an error will
     * be thrown.
     * @param newCookie
     */
    Rodentify.SetCookie = (newCookie) => (_settings.cookie = newCookie);
    /** Gets the cookie currently in use by Rodentify. */
    Rodentify.GetCookie = () => _settings.cookie;
    /**
     * Gets the real IP address of a Roblox game server running the
     * specified place and job ID. To use this method the place ID must belong
     * to a place that is *completely* public (not friends only/paid access) and
     * the server not full. This is because it is essentially initialling a join
     * request to the game and that game must be assessable to the account cookie
     * that was set.
     *
     * @example
     * ```typescript
     * const serverAddress = await GetServerAddress(123456789, '4136c54c-07e6-11eb-adc1-0242ac120002')
     * ```
     */
    function GetServerAddress(placeId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_settings.cookie)
                throw new Error('No cookie has been set');
            const serverData = yield GetServerData(placeId, jobId);
            return serverData.MachineAddress
        });
    }

    function GetServerPort(placeId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_settings.cookie)
                throw new Error('No cookie has been set');
            const serverData = yield GetServerData(placeId, jobId);
            return serverData.Port
        });
    }

    Rodentify.GetServerPort = GetServerPort;
    Rodentify.GetServerAddress = GetServerAddress;
    /**
     * Gets various information about a game server including session information,
     * and server port and address. To use this method the place ID must belong
     * to a place that is *completely* public (not friends only/paid access) and
     * the server not full. This is because it is essentially initialling a join
     * request to the game and that game must be assessable to the account cookie
     * that was set.
     *
     * @example
     * ```typescript
     * const serverData = await GetServerData(123456789, '4136c54c-07e6-11eb-adc1-0242ac120002')
     * const countryCode = serverData.CountryCode
     * ```
     */
    function GetServerData(placeId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_settings.cookie)
                throw new Error('No cookie has been set');
            return GetServerInfo_1._GetServerData(placeId, jobId, _settings.cookie);
        });
    }
    Rodentify.GetServerData = GetServerData;
    /**
     * Checks if a Roblox server is still alive (joinable) and returns a boolean
     *
     * @example
     * ```typescript
     * const isServerRunning = await IsServerAlive(123456789, '4136c54c-07e6-11eb-adc1-0242ac120002')
     * if (!isServerRunning) return res.sendStatus(401)
     * ```
     */
    function IsServerAlive(placeId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_settings.cookie)
                throw new Error('No cookie has been set');
            try {
                const joinTicket = yield GetServerInfo_1._GetJoinTicket(placeId, jobId, _settings.cookie);
                return joinTicket !== undefined;
            }
            catch (e) {
                return false;
            }
        });
    }
    Rodentify.IsServerAlive = IsServerAlive;
})(Rodentify || (Rodentify = {}));
module.exports = Rodentify;
