class Urls {
	constructor(url, book, skipFallback) {
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
			this.contentAnchored = this.contentUnanchored + "#" + this.anchor;
		}
	}
}

export default Urls;
