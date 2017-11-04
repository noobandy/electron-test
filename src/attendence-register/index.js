'use strict'

const path = require('path')
const Logger = require(path.join(__dirname, '../utils/logger'))
const AttendenceRegisterStore = require(path.join(__dirname,'../data-store')).AttendenceRegisterStore

function AttendenceRegister() {
	var data = {}
	return {
		getAttendence: function(jobRole, year, month) {
			return new Promise(function(resolve, reject) {
				
				if(!(data[year] || data[year][month])) {

					AttendenceRegisterStore.get(year, month)
					.then(function(result) {
						data[year][month] = result;
						resolve(data[year][month][jobRole])
					})
					.catch(function(err) {
						reject(err)
					})

				} else {
					resolve(data[year][month][jobRole])
				}
			})
		},
		markAttendence: function(jobRole, year, month, day, present) {
			data[year][month][jobRole][day - 1] = present

			return new Promise(function(resolve, reject) {
				return AttendenceRegisterStore.save(data).then(function(result) {
					resolve();
				}).catch(function(err) {
					reject(err);
				})
			})
		}
	}
}


module.exports = AttendenceRegister()