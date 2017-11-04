'use strict'
const path = require('path')
const Logger = require(path.join(__dirname, '../utils/logger'))
const ContactStore = require(path.join(__dirname,'../data-store')).ContactStore

function Contact() {
	var data

	return {
		list: function() {
			return new Promise(function(resolve reject) {
				if(data) {
					resolve(JSON.parse(JSON.stringify(data)))
				} else {
					ContactStore.getAll()
					.then(function(result) {
						data = result
						resolve(JSON.parse(JSON.stringify(data)))
					})
					.catch(function(err) {
						reject(err)
					})
				}
			})
		},
		updateDetails: function(jobRole, name, mobileNumber) {
			
			data[jobRole][history].push({
				date: new Date(), 
				name: data[jobRole][name], 
				mobileNumber: data[jobRole][mobileNumber]})

			data[jobRole]['name'] = name
			data[jobRole]['mobileNumber'] = mobileNumber
			
			return new Promise(function(resolve, reject) {
				ContactStore.save({jobRole: data[jobRole]})
				.then(function(result) {
					resolve(result)
				})
				.catch(function(err) {
					reject(err)
				})
			})
		}
	}
}

module.exports.newContact = function(jobRole, name, mobileNumber) {
	return Contact(jobRole, name, mobileNumber)
}
