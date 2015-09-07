/*
 * Fetch resources from the battle.net api.
 * Influenced and borrowed heavily from:
 *  https://github.com/Ulminia/blizzard-api-oauth
 *  https://github.com/benweier/battlenet-api
 */

var request = require('request-promise'),
	extend = require('extend');

module.exports = function(options){
	'use strict';

	var version = 'v0.1.1';

	if (typeof options !== 'object') {
		options = {
			BNET_ID: options || false
		};
	}

	var requiredDefaults = {
		method: 'GET',
		encoding: 'UTF-8',
		headers: {
			'User-Agent': 'Node.js/' + process.version + ' promise-battlenet-api/' + version
		},
		json: true,
		qs: {},
		resolveWithFullResponse: true
	};

	var optionalDefaults = {
		timeout: options.timeout || 10000,
		followRedirect: options.followRedirect || true,
		maxRedirects: options.maxRedirects || 10,
		gzip: options.gzip || true,
	};

	optionalDefaults.transform = function (body, response) {
		return {
			statusCode: response.statusCode,
			headers: response.headers,
			body: response.body
		};
	};

	var _pick = function(obj) {
		var result = {};

		if (obj === null) return result;

		var keys = Array.prototype.concat.apply([], Array.prototype.slice.call(arguments, 1));
		obj = new Object(obj);
		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			if (key in obj) result[key] = obj[key];
		}

		return result;
	};

	var _mapRegionToEndpoint = function(region) {

		region = region.toLowerCase();

		var endpoints = {
			us: {
				hostname: 'us.api.battle.net',
				defaultLocale: 'en_US'
			},
			eu: {
				hostname: 'eu.api.battle.net',
				defaultLocale: 'en_GB'
			},
			sea: {
				hostname: 'sea.api.battle.net',
				defaultLocale: 'en_US'
			},
			kr: {
				hostname: 'kr.api.battle.net',
				defaultLocale: 'ko_KR'
			},
			tw: {
				hostname: 'tw.api.battle.net',
				defaultLocale: 'zh_TW'
			},
			cn: {
				hostname: 'api.battlenet.com.cn',
				defaultLocale: 'zh_CN'
			}
		};

		if (region in endpoints) {
			return endpoints[region];
		}

		return endpoints.us;
	};

	var _buildType = function(resource, params){
		var path = null;
		switch (resource)
		{
			case 'achievement':
				path = 'wow/achievement/' + params['id'];
				break;
			case 'auction':
				path = 'wow/auction/data/' + params['realm'];
				break;
			case 'abilities':
				path = 'wow/battlepet/ability/' + params['id'];
				break;
			case 'species':
				path = 'wow/battlepet/species/' + params['id'];
				break;
			case 'stats':
				path = 'wow/battlepet/stats/' + params['id'];
				break;
			case 'realm_leaderboard':
				path = 'wow/challenge/' + params['realm'];
				break;
			case 'region_leaderboard':
				path = 'wow/challenge/region';
				break;
			case 'team':
				path = 'wow/arena/' + params['realm'] + '/' + params['size'] + '/' + params['name'];
				break;
			case 'character':
				path = 'wow/character/' + params['realm'] + '/' + params['name'];
				break;
			case 'item':
				path = 'wow/item/' + params['id'];
				break;
			case 'item_set':
				path = 'wow/item/set/' + params['id'];
				break;
			case 'guild':
				path = 'wow/guild/' + params['realm'] + '/' + params['name'];
				break;
			case 'leaderboards':
				path = 'wow/leaderboard/' + params['size'];
				break;
			case 'quest':
				path = 'wow/quest/' + params['id'];
				break;
			case 'realmstatus':
				path = 'wow/realm/status';
				break;
			case 'recipe':
				path = 'wow/recipe/' + params['id'];
				break;
			case 'spell':
				path = 'wow/spell/' + params['id'];
				break;
			case 'battlegroups':
				path = 'wow/data/battlegroups/';
				break;
			case 'races':
				path = 'wow/data/character/races';
				break;
			case 'classes':
				path = 'wow/data/character/classes';
				break;
			case 'achievements':
				path = 'wow/data/character/achievements';
				break;
			case 'guild_rewards':
				path = 'wow/data/guild/rewards';
				break;
			case 'guild_perks':
				path = 'wow/data/guild/perks';
				break;
			case 'guild_achievements':
				path = 'wow/data/guild/achievements';
				break;
			case 'item_classes':
				path = 'wow/data/item/classes';
				break;
			case 'talents':
				path = 'wow/data/talents';
				break;
			case 'pet_types':
				path = 'wow/data/pet/types';
				break;
			default:
				break;
		}
		return path;
	};

	var _buildUrl = function(resource, params, config) {

		if(typeof config === "undefined"){
			config = {};
		}

		var keys = ['url', 'qs', 'timeout', 'followRedirect', 'maxRedirects', 'encoding', 'gzip', 'tunnel', 'proxy', 'proxyHeaderWhiteList', 'proxyHeaderExclusiveList'],
			endpoint = _mapRegionToEndpoint(params.region),
			path = _buildType(resource, params),
			fields = params.fields || '',
			locale = params.locale || endpoint.defaultLocale,
			apikey = config.apikey || client.API_KEY || process.env.BNET_ID || process.env.BATTLENET_API_KEY || '';

		var req = extend(true, {
			url: 'https://' + endpoint.hostname + "/" + path,
			qs: {
				locale: locale,
				apikey: apikey,
				fields: fields
			}
		}, requiredDefaults, optionalDefaults, _pick(config, keys));

		return req;
	};

	var client = {

		API_KEY: "",

		setApiKey: function(key){
			client.API_KEY = key;
		},

		fetch: function(resource, params, config) {
			var req = _buildUrl(resource, params, config);
			return (function(){
				var requestTs = Date.now();
				return request(req)
					.then(function (result){
						result.responseTime = Date.now() - requestTs;
						return result;
					});
			})();
		}

	};

	return client;
};
