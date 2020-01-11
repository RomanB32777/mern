const {Router} = require('express')
const router = Router()
const bcypt = require('bcryptjs') // хэшировать пароли и сравнивать 
const {check, validationResult} = require('express-validator') 
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth
router.post(
    '/register',
    // мидлвейр
    [
    check('email', 'Некорректная почта').isEmail(),
    check('password', 'Некорректный пароль - мин 6 символов').isLength({ min: 6 }),
    ],
    async (req, res) => {
    try {
        console.log("Body:", req.body);
        
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(), // приводит к массиву,
                message: 'Некорректные данные'
            })
        } // если есть ошибки


        const {email, password} = req.body

        const can = await User.findOne({ email })

        if (can){
            return res.status(400).json({ message: 'Такой уже есть' })
        }

        const hashedPassword = await bcypt.hash(password, 12)

        const user = new User({email, password: hashedPassword})

        await user.save()
        res.status(201).json({message: 'Создан' })

    } catch (e) {
        res.status(500).json({ message: 'Ошибка'})
    }
}) // /api/auth/register

router.post(
    '/login',
    [
    check('email', 'Некорректная почта').normalizeEmail().isEmail(),
    check('password', 'Некорректный пароль - мин 6 символов').exists(), // пароль должен существовать
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(), // приводит к массиву,
                message: 'Некорректные данные'
            })
        } // если есть ошибки


        const {email, password} = req.body

        const user = await User.findOne({ email })

        if (!user){
            return res.status(400).json({ message: 'Не найден' })
        }


        const isMatch = await bcypt.compare(password, user.password)

        if (!isMatch){
            return res.status(400).json({ message: 'Не верный пароль' })
        }

       // console.log("password", password);
        

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' } // через сколько токен закончит свое существование
        )


        res.json({token, userId: user.id, message: 'Добро пожаловать' })

    } catch (e) {
        res.status(500).json({ message: 'Ошибка'})
    }
})

module.exports = router