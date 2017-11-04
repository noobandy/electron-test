'use strict'
const path = require('path')
const fs = require('fs')

const STORE_DIR = path.join(__dirname, './data')

function AttendenceRegisterStore() {
	return {
		save: function(register) {

		},
		get: function(year, month) {

		}
	}
}


function ContactStore() {
	var CONTACT_STORE_DIR = path.join(STORE_DIR, './contact')

	return {
		getAll: function() {
			return new Promise(function(resolve, reject) {
				fs.readDir(path.join(CONTACT_STORE_DIR), function(err, files) {
					if(err) {
						reject(err)
					} else {
						let promises = []
						for(let i = 0; i < files.length; i++) {
							promises.push(new Promise(function(resolve, reject) {
								fs.readFile(path.join(CONTACT_STORE_DIR, files[i]), 
									function(err, fileData) {
										if(err) {
											reject(err)
										} else {
											resolve({fileName: files[i], data: fileData})
										}
									})
							}))
						}

						Promise.all(promises)
						.then(function(promiseData) {
							let data = {}
							for(let i = 0; i < promiseData.length; i++) {
								data[promiseData[i].fileName] = JSON.parse(promiseData[i].data)
							}

							resolve(data)
						})
						.catch(function(err) {
							reject(err)
						})
					}
				})
			})
		},
		getOne: function(jobRole) {
			return new Promise(function(resolve, reject) {
				qw
			})
		},
		save: function(contact) {
			return new Promise(function(resolve, reject) {
								fs.stat(CONTACT_STORE_DIR, function(err, stats) {
					if(err) {
						reject(err)
					} else {
						if(!stats.isDirectory()) {
							fs.mkdir(CONTACT_STORE_DIR, function(err) {
								if(err) {
									reject(err)
								} else {
									
								}
							})
						} else {

						}
					}
				})
			})
		},
		delete: function(contact) {

		}
	}
} 



module.exports.AttendenceRegisterStore = AttendenceRegisterStore()
module.exports.ContactStore = ContactStore()
