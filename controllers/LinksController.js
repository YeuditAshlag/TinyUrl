
import LinkModel from "../models/links.js"
import UserModel from "../models/users.js";


const linksController = {
    getList: async (req, res) => {
        try {
            const links = await LinkModel.find();
            res.json({ links })

        }
        catch (e) {
            res.status(400).json({ message: e.message })
        }

    },
    redirectLink: async (req, res) => {
        const { id } = req.params;

        try {
            const link = await LinkModel.findById(id);
            if (!link) {
                res.status(404).send('Link Not Found');
            }
            const clickData = {
                insertedAt: Date.now(),
                ipAddress: req.ip,
                targetParamValue: req.query[link.targetParamName]

            };
            link.clicks.push(clickData)
            await link.save();
            res.redirect(link.originalUrl);

        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    getClickStatus: async (req, res) => {

        try {
            const link = await LinkModel.findById(req.params.id);
            if (!link) {
                return res.status(404).send('Link not found');
            }

            const targetValueMap = link.targetValues.reduce((acc, target) => {
                acc[target.value] = target.name;
                return acc;
            }, {});


            const clickData = link.clicks.reduce((acc, click) => {
                const targetValue = click.targetParamValue || 'unknown';
                const targetName = targetValueMap[targetValue] || 'unknown';
                acc[targetName] = (acc[targetName] || 0) + 1;
                return acc;
            }, {});

            res.json(clickData);
        } catch (err) {
            res.status(500).send('Server error');
        }
    },


    add: async (req, res) => {
        const { originalUrl, targetParamName, targetValues, userId } = req.body;
        try {

            if (!originalUrl || !userId) {
                return res.status(400).json({ message: 'missing userId' })
            }
            const currentUser = await UserModel.findById(userId).populate('links');;
            const existUrl = currentUser.links.find(link => link.originalUrl == originalUrl)
            if (existUrl) {
                return res.json("you already this link")
            }
            const newLink = await LinkModel.create({ originalUrl, targetParamName, targetValues });
            const fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}/${newLink._id}`;
            currentUser.links.push(newLink);
            await currentUser.save();
            res.json({ link: fullURL, ...newLink });

        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
       
        try {
            const updatedLink = await LinkModel.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

            if (!updatedLink) {
                return res.status(404).json({ success: false, message: "Link not found" });
            }

            res.status(200).json({ success: true, data: updatedLink });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await LinkModel.findByIdAndDelete(id);
            res.json(deleted);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
}

export default linksController;