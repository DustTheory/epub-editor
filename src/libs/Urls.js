import EpubCFI from 'epubjs/src/epubcfi';

class Urls {
	// Absolute clusterfuck
	// Must rewrite
	// ... but later
	constructor(url, book, skipFallback) {
		this.book = book;
		this.generateFlattenedToc()

		if(isCfiString(url))
			url = this.hrefFromCfi(url);
		
		if (!url) {
			this.found = false;
			this.inResources = false;
			this.absoluteAnchored = "";
			this.absoluteUnanchored = "";
			this.anchor = "";
			return;
		}
		this.found = true;
		this.inResources = true;
		this.absoluteAnchored = book.resolve(url);
		[this.absoluteUnanchored, this.anchor] = this.absoluteAnchored.split("#");
		this.anchor = this.anchor || "";
		let resource = Object.entries(book.resources.manifest).find(([_, resource]) => {
			return this.absoluteUnanchored.endsWith(resource.href);
		});
		if (!resource || !book.archive.zip.files[this.absoluteUnanchored.substr(1)]) {
			this.inResources = false;
			if (!book.archive.zip.files[this.absoluteUnanchored.substr(1)]) {
				// fallback
				if (!skipFallback) {
					let fallbackUrl = new Urls("/" + url, book, true);
					if (fallbackUrl.found) {
						this.absoluteAnchored = fallbackUrl.absoluteAnchored;
						this.absoluteUnanchored = fallbackUrl.absoluteUnanchored;
						this.anchor = fallbackUrl.anchor;
						this.contentAnchored = fallbackUrl.contentAnchored;
						this.contentUnanchored = fallbackUrl.contentUnanchored;
						this.id = fallbackUrl.id;
					} else {
						this.found = false;
					}
				} else {
					this.found = false;
				}
			}
		} else {
			this.id = resource[0];
			this.contentUnanchored = resource[1].href;
			this.contentAnchored = this.contentUnanchored + (this.anchor ? "#" + this.anchor : '');
		}

		this.cfi = this.generateCfi();

	}

	generateFlattenedToc(){
		if(!this.book)
			return;
		this.flattenedToc = (function flatten(items) {
			return [].concat.apply([], items.map(item => [].concat.apply(
				[item],
				flatten(item.subitems)
			)));
		})(this.book.navigation.toc);	
	}

	hrefFromCfi(cfi){
		let parsed = new EpubCFI(cfi);
		console.log("parsed", parsed);
	
		let entry = this.book.spine.get(parsed.spinePos);
		console.log("entry", entry);
		if (!entry) return null;

		let matched = Object.entries(this.book.navigation.tocById).filter(e => e[1] == entry.index);
		console.log("matched", matched);
		if (matched.length < 1) return null;

		let matchedToc = this.flattenedToc.filter(e => e.id == matched[0][0]);
		console.log("matchedToc", matchedToc);
		if (matchedToc.length < 1) return null;
		return matchedToc[0].href;
	}
	
	async generateCfi(){
		if(!this.contentAnchored)
			return;
		const id = this.contentAnchored.split('#')[1]
		const item = this.book.spine.get(this.contentAnchored)
		await item.load(this.book.load.bind(this.book))
		const el = id ? item.document.getElementById(id) : item.document.body
		return item.cfiFromElement(el);
	}
}

export default Urls;



function isCfiString(str) {
	if(typeof str === "string" &&
		str.indexOf("epubcfi(") === 0 &&
		str[str.length-1] === ")") {
		return true;
	}

	return false;
}
